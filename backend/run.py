#!/usr/bin/env python3
"""
Script para iniciar el backend de Web Agencia.
Configura el PYTHONPATH correctamente antes de importar la aplicacion.
"""

import sys
import os

# Agregar el directorio actual al PYTHONPATH
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Ahora importamos y ejecutamos la app
from app.main import app
import uvicorn
from app.config import settings

if __name__ == "__main__":
    print(f"Iniciando Web Agencia Backend en https://web-agencia-backend.onrender.com")
    print(f"Documentacion disponible en https://web-agencia-backend.onrender.com/docs")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.port,
        reload=settings.app_env == "development"
    )
