🚀 Simulação Espacial 3D — Three.js + WebGL

Uma simulação espacial interativa usando Three.js para explorar o sistema solar com proporções reduzidas, pilotando uma nave em primeira ou terceira pessoa.

🛠️ Tecnologias

💻 Instalação e Execução

Pré-requisitos

Certifique-se de ter o Node.js (LTS) e o npm instalados.

# Verifique as versões
node -v
npm -v


Clonagem e Inicialização

Clone o repositório, instale as dependências e inicie o servidor de desenvolvimento.

# 1. Clone o repositório (substitua pelos seus dados)
git clone [https://github.com/](https://github.com/)<usuario>/<repositorio>.git
cd <repositorio>

# 2. Instale as dependências
npm install
npm install three # O Three.js pode ser instalado como dependência do projeto

# 3. Inicie o servidor de desenvolvimento
npm run dev


O servidor deverá fornecer um link web (geralmente http://localhost:5173/ ao usar o Vite).

🕹️ Controles

Movimentação

Tecla

Ação

W / S

Inclinação vertical (Pitch)

A / D

Rotação lateral (Roll)

Space

Acelerar / Thrust

Câmera

Tecla

Ação

Mouse

Olhar ao redor (em modo Orbit)

C

Trocar modo de câmera

🎥 Modos de Câmera

Modo

Descrição

Follow

Câmera em terceira pessoa, seguindo a nave.

First Person

Visão do cockpit, em primeira pessoa.

Orbit

Câmera livre, permitindo o zoom-out da cena.

🪐 Escalas e Distâncias

As proporções foram ajustadas para melhor visualização no navegador.

Tamanhos

(Proporção real multiplicada por ~4)
| Corpo | Escala |
| :---: | :----: |
| Sol | 40 |
| Mercúrio | 1 |
| Vênus | 2.2 |
| Terra | 2.4 |
| Lua | 0.4 |
| Marte | 1.4 |
| Júpiter | 12 |
| Saturno | 8 |
| Urano | 4 |
| Netuno | 3.8 |

Distâncias

(1 u $\approx$ 1.000.000 km)
| Corpo | Distância Real | Distância no Projeto |
| :---: | :------------: | :------------------: |
| Terra → Lua | 384.400 km | 4 u |
| Terra → Sol | 149.600.000 km | 150 u |
| Sol → Mercúrio | 57.900.000 km | 58 u |
| Sol → Vênus | 108.200.000 km | 108 u |
| Sol → Marte | 227.900.000 km | 228 u |
| Sol → Júpiter | 778.500.000 km | 780 u |
| Sol → Saturno | 1.433.000.000 km | 1430 u |
| Sol → Urano | 2.877.000.000 km | 2870 u |
| Sol → Netuno | 4.503.000.000 km | 4500 u |

🌟 Roadmap

O projeto está em desenvolvimento. As próximas melhorias planejadas incluem:

Sistema de colisão.

HUD (Head-Up Display) no cockpit.

Informações da nave (velocidade, dias, planeta mais próximo).

Autopilot.

Orbit automático.

📜 Créditos e Licenças

Modelos 3D

“Sci-fi Spaceship Cockpit 02” — NotARealStudio — CC BY 4.0

“SpaceShip” — JazOone — CC BY 4.0

Texturas

Solar System Scope

Space Sphere Maps

Áudio

Engine Loop (Google Drive)

Moonlight – Gravity Sound (Google Drive)

⭐ Contribuições

Pull requests, issues e sugestões são bem-vindos! Para grandes mudanças, por favor, abra um issue primeiro para discutir o que você gostaria de mudar.
