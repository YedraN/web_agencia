---
title: "Terraform: infraestructura como código para principiantes"
description: "Guía práctica de Terraform para principiantes: conceptos básicos, HCL, estado, proveedores y cómo gestionar infraestructura como código."
date: "2025-04-28"
tags: ["Terraform", "Infraestructura", "DevOps", "IaC"]
---

Terraform de HashiCorp es la herramienta más popular para gestionar infraestructura como código (IaC). Permite definir recursos de nube (servidores, bases de datos, redes) en archivos declarativos y gestionar su ciclo de vida de forma reproducible.

## Conceptos fundamentales

Terraform utiliza **HCL** (HashiCorp Configuration Language) para definir recursos. Declaras lo que quieres (un servidor, una base de datos) y Terraform determina cómo crearlo, modificarlo o eliminarlo.

El **estado** (state) es el archivo que Terraform usa para mapear recursos declarados con recursos reales. Se recomienda almacenarlo en backend remoto (S3, Terraform Cloud) para trabajo en equipo.

## Ciclo de trabajo básico

`terraform init` descarga los proveedores (AWS, Azure, GCP, Cloudflare). `terraform plan` muestra los cambios sin aplicarlos. `terraform apply` ejecuta los cambios. `terraform destroy` elimina todos los recursos gestionados.

## Buenas prácticas

Organiza tu código en módulos reutilizables. Usa workspaces o directorios separados para diferentes entornos (dev, staging, prod). Bloquea versiones de proveedores y Terraform. Implementa políticas de seguridad con Sentinel o OPA.

## Terraform vs alternativas

Terraform Cloud ofrece colaboración, policy as code y runs remotos. OpenTofu es un fork open-source que mantiene compatibilidad con Terraform. Pulumi permite usar lenguajes de programación (TypeScript, Python, Go) en lugar de HCL.

Terraform es la base de cualquier estrategia moderna de infraestructura. En Vynta aplicamos IaC para garantizar entornos reproducibles y despliegues sin errores manuales.
