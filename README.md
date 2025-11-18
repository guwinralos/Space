<p align="center">
  <img src="https://api.xelajs.com/banner?title=Space+Simulation+3D&subtitle=Three.js+%7C+WebGL+%7C+Cockpit+Experience&theme=dark&fontSize=70" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Three.js-3D%20Engine-black?logo=three.js&style=for-the-badge" />
  <img src="https://img.shields.io/badge/WebGL-Enabled-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&style=for-the-badge" />
  <img src="https://img.shields.io/badge/GLTFLoader-3D%20Models-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-CC%20BY%204.0-blue?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/<usuario>/<repositorio>/main/demo.gif" width="80%" />
</p>

---

# 🚀 Simulação Espacial 3D — Three.js + WebGL

Uma simulação espacial interativa usando **Three.js** para explorar o sistema solar com proporções reduzidas, pilotando uma nave em primeira ou terceira pessoa.

---

# 🌌 Demonstração  
🎥 **YouTube:** https://youtu.be/bZj1B2F4xoU  

---

# 📦 Pré-requisitos

- Node.js (LTS)
- npm

Confira:
```bash
node -v
npm -v
git clone https://github.com/<usuario>/<repositorio>.git
cd <repositorio>
npm install
npm install three
npm run dev
npx vite(gerar link web)
````
🕹️ Controles
Movimentação
Tecla	Ação
W / S	inclinação vertical
A / D	rotação lateral
Space	acelerar
Câmera
Tecla	Ação
Mouse	olhar ao redor
C	trocar modo de câmera

🎥 Modos de Câmera

Follow — terceira pessoa
First Person — cockpit, primeira pessoa
Orbit — câmera livre com zoom-out

🪐 Escalas e Distâncias

Os tamanhos dos planetas usam proporção real multiplicada por ~4.

Tamanhos
Corpo	Escala
Sol	40
Mercúrio	1
Vênus	2.2
Terra	2.4
Lua	0.4
Marte	1.4
Júpiter	12
Saturno	8
Urano	4
Netuno	3.8

Distâncias (1 u ≈ 1.000.000 km)
Corpo	Real	Projeto
Terra → Lua	384.400 km	4 u
Terra → Sol	149.600.000 km	150 u
Sol → Mercúrio	57.900.000 km	58 u
Sol → Vênus	108.200.000 km	108 u
Sol → Marte	227.900.000 km	228 u
Sol → Júpiter	778.500.000 km	780 u
Sol → Saturno	1.433.000.000 km	1430 u
Sol → Urano	2.877.000.000 km	2870 u
Sol → Netuno	4.503.000.000 km	4500 u


🔊 Créditos e Licenças
Modelos 3D

“Sci-fi Spaceship Cockpit 02” — NotARealStudio — CC BY 4.0
“SpaceShip” — JazOone — CC BY 4.0

Texturas
Solar System Scope
Space Sphere Maps

Áudio
Engine Loop (Google Drive)
Moonlight – Gravity Sound (Google Drive)

🛠️ Tecnologias

Three.js
WebGL
Vite
Node.js

🚧 Roadmap

Sistema de colisão
HUD no cockpit
Informações da nave (velocidade, dias, planeta mais próximo)
Autopilot
Orbit automático


⭐ Contribuições
Pull requests são bem-vindos! 😄
