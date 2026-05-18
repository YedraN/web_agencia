---
title: "SQLC: generación de código tipo seguro para SQL"
description: "SQLC genera código TypeScript/Go tipo seguro desde consultas SQL. Guía práctica para integrar SQLC en tu pipeline de desarrollo backend."
date: "2025-12-05"
tags: ["SQLC", "TypeScript", "SQL", "Backend"]
---

SQLC es una herramienta que genera código tipo seguro a partir de consultas SQL. Escribes SQL puro, SQLC analiza las consultas contra tu esquema y genera funciones con tipos completos en Go, TypeScript, Python, Rust y otros lenguajes.

## Cómo funciona SQLC

Defines tu esquema en archivos `.sql` con migraciones estándar. Luego escribes consultas SQL con nombres significativos. SQLC las analiza, verifica que sean válidas contra el esquema, y genera código con tipos inferidos automáticamente.

Ejemplo: una query `SELECT id, name, email FROM users WHERE id = $1` genera una función `getUser(id: number): Promise<{id: number, name: string, email: string}>`. Si cambias el esquema y la query deja de ser válida, SQLC falla en compilación, no en producción.

## Ventajas sobre ORMs

SQLC no abstrae SQL, lo celebra. No hay capa de mapeo objeto-relacional, no hay magic methods, no hay N+1 queries inesperados. El rendimiento es el de SQL optimizado manualmente, con la seguridad de tipos del lenguaje.

## Integración en proyectos TypeScript

SQLC se integra fácilmente con cualquier proyecto Node.js. Se ejecuta en el pipeline de build, generando archivos `.ts` que importas directamente. Funciona con PostgreSQL, MySQL y SQLite.

Si valoras el control sobre las consultas SQL pero no quieres perder el tipado, SQLC es la herramienta que estabas esperando. En Vynta aplicamos SQLC en proyectos donde el rendimiento de base de datos es crítico.
