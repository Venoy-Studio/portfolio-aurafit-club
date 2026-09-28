import React, { useEffect, useRef } from 'react'

const vertexShaderSource = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_velocity;
uniform float u_density;
uniform float u_interactive;

void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 m = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    vec2 diff = st - m;
    float dist = length(diff);

    float maxRadius = 0.38 + min(u_velocity * 0.18, 0.22);
    float influence = smoothstep(maxRadius, 0.0, dist) * u_interactive;

    float shockwave = sin(dist * 20.0 - u_time * 4.0) * exp(-dist * 4.5) * (0.015 + min(u_velocity * 0.05, 0.06)) * u_interactive;
    vec2 warp = normalize(diff + vec2(1e-5)) * (influence * 0.075 + shockwave);

    vec2 ambientBreath = vec2(
        sin(st.y * 6.0 + u_time * 0.7) * 0.007 + cos(st.x * 5.0 - u_time * 0.4) * 0.004,
        cos(st.x * 6.0 + u_time * 0.7) * 0.007 + sin(st.y * 5.0 + u_time * 0.4) * 0.004
    );

    vec2 distortedSt = st - warp + ambientBreath;
    vec2 gridUV = fract(distortedSt * u_density) - 0.5;
    float dotDist = length(gridUV);

    float baseRadius = 0.115;
    float activeRadius = baseRadius + influence * 0.14;

    float aa = 0.038;
    float dotMask = 1.0 - smoothstep(activeRadius - aa, activeRadius + aa, dotDist);

    vec3 bgColor = vec3(0.0196, 0.0196, 0.0196);
    vec3 idleDotColor = vec3(0.24, 0.25, 0.28);
    vec3 neonGreen = vec3(0.776, 1.0, 0.0);

    vec3 dotColor = mix(idleDotColor, neonGreen, influence * 0.9);
    float vignette = clamp(1.0 - length(st) * 0.35, 0.45, 1.0);

    float dotIntensity = (0.32 + influence * 0.68) * vignette;
    float dotAlpha = dotMask * dotIntensity * 0.50;

    vec3 finalColor = mix(bgColor, dotColor, dotAlpha);
    float cursorGlow = exp(-dist * 5.5) * (0.018 + min(u_velocity * 0.03, 0.045)) * u_interactive;
    finalColor += neonGreen * cursorGlow;

    gl_FragColor = vec4(finalColor, 1.0);
}
`

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: 'high-performance',
    })

    if (!gl) {
      console.warn('WebGL not supported, falling back to 2D Canvas for dot matrix.')
      return
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const posLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLocation)
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uVelocity = gl.getUniformLocation(program, 'u_velocity')
    const uDensity = gl.getUniformLocation(program, 'u_density')
    const uInteractive = gl.getUniformLocation(program, 'u_interactive')

    let animationFrameId: number
    let startTime = performance.now()

    let mouseX = window.innerWidth * 0.5
    let mouseY = window.innerHeight * 0.5
    let targetX = mouseX
    let targetY = mouseY
    let prevX = mouseX
    let prevY = mouseY
    let velocity = 0
    let currentInteractive = 0
    let targetInteractive = 0.5

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uResolution, canvas.width, canvas.height)

      const density = width < 768 ? 28 : 42
      gl.uniform1f(uDensity, density)
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      targetInteractive = 1
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      if ('touches' in e && e.touches.length > 0) {
        targetX = e.touches[0].clientX * dpr
        targetY = (window.innerHeight - e.touches[0].clientY) * dpr
      } else if ('clientX' in e) {
        targetX = (e as MouseEvent).clientX * dpr
        targetY = (window.innerHeight - (e as MouseEvent).clientY) * dpr
      }
    }

    const handleMouseLeave = () => {
      targetInteractive = 0.2
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    window.addEventListener('touchstart', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    let isRunning = true
    const render = (currentTime: number) => {
      if (!isRunning) return
      const elapsed = (currentTime - startTime) * 0.001
      const lerpFactor = 0.12

      mouseX += (targetX - mouseX) * lerpFactor
      mouseY += (targetY - mouseY) * lerpFactor

      const dx = mouseX - prevX
      const dy = mouseY - prevY
      const instantVelocity = Math.sqrt(dx * dx + dy * dy) * 0.05
      velocity = velocity * 0.9 + instantVelocity * 0.1
      prevX = mouseX
      prevY = mouseY

      currentInteractive += (targetInteractive - currentInteractive) * 0.08

      gl.uniform1f(uTime, elapsed)
      gl.uniform2f(uMouse, mouseX, mouseY)
      gl.uniform1f(uVelocity, velocity)
      gl.uniform1f(uInteractive, currentInteractive)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId)
      } else {
        startTime = performance.now()
        animationFrameId = requestAnimationFrame(render)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('touchstart', handlePointerMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (buffer) gl.deleteBuffer(buffer)
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
      if (program) gl.deleteProgram(program)
    }
  }, [])

  return (
    <div
      id="dot-distortion-shader-root"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block bg-[#050505]" style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
