# Calculadora de Tasa de Cambio - README

## 📋 Descripción

Aplicación web para calcular y visualizar tasas de cambio entre Pesos Colombianos (COP), Bolívares (Bs) y Dólares BCV.

## 🚀 Cómo Usar

### Opción 1: Con Servidor HTTP (Recomendado)

Para que el botón de descarga funcione correctamente, ejecuta el servidor local:

```bash
python server.py
```

Luego abre en tu navegador: **http://localhost:8000**

### Opción 2: Abrir Directamente

Puedes abrir `index.html` directamente en el navegador, pero el botón de descarga puede no funcionar debido a restricciones de seguridad CORS.

## 📁 Estructura del Proyecto

```
imagen/
├── index.html          # Estructura HTML
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── server.py           # Servidor HTTP local
├── README.md           # Este archivo
└── images/             # Imágenes (banderas y logos)
    ├── bandera_colombia.png
    ├── bandera_venezuela.png
    ├── logo_pina_dolar.png
    └── logo_binance_bnb.png
```

## ✨ Funcionalidades

- ✅ Cálculo automático de conversiones
- ✅ Actualización en tiempo real
- ✅ Tabla de conversiones predefinidas (10,000 a 100,000 pesos)
- ✅ Descarga de imagen PNG de la tabla
- ✅ Diseño responsive

## 🔧 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Python 3.x (solo para el servidor local)

## ⚠️ Notas Importantes

- **Botón de Descarga**: Funciona mejor cuando se ejecuta con el servidor HTTP local
- **CORS**: Las restricciones de seguridad del navegador pueden impedir la descarga cuando se abre desde `file://`
- **Imágenes**: Asegúrate de que todas las imágenes estén en la carpeta `images/`

## 🛠️ Desarrollo

El proyecto está organizado siguiendo el principio de separación de responsabilidades:

- **HTML**: Solo estructura y contenido
- **CSS**: Todos los estilos visuales
- **JavaScript**: Toda la lógica de la aplicación
