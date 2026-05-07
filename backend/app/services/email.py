import resend
from app.config import settings

resend.api_key = settings.resend_api_key


async def send_confirmation_email(email: str, token: str, nombre: str | None = None) -> bool:
    confirmation_url = f"{settings.frontend_url}/confirm-email?token={token}"
    
    try:
        r = resend.Emails.send({
            "from": settings.email_from,
            "to": email,
            "subject": "Confirma tu email - Nova Studio",
            "html": f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f0f0f; padding: 40px; }}
                    .container {{ max-width: 500px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; padding: 32px; }}
                    h1 {{ color: #fff; font-size: 24px; margin-bottom: 16px; }}
                    p {{ color: #a0a0a0; line-height: 1.6; margin-bottom: 24px; }}
                    .button {{ display: inline-block; background: #fff; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; }}
                    .footer {{ margin-top: 24px; font-size: 12px; color: #666; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>¡Bienvenido{nombre and f' {nombre}' or ''}!</h1>
                    <p>Gracias por registrarte en Nova Studio. Para completar tu cuenta, necesitamos confirmar tu dirección de email.</p>
                    <a href="{confirmation_url}" class="button">Confirmar mi email</a>
                    <p style="margin-top: 20px; font-size: 14px;">Este enlace expira en 24 horas.</p>
                    <div class="footer">
                        Si no te registraste en Nova Studio, puedes ignorar este email.
                    </div>
                </div>
            </body>
            </html>
            """,
        })
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


async def send_recovery_email(email: str, token: str, nombre: str | None = None) -> bool:
    recovery_url = f"{settings.frontend_url}/reset-password?token={token}"
    
    try:
        r = resend.Emails.send({
            "from": settings.email_from,
            "to": email,
            "subject": "Recuperación de contraseña - Nova Studio",
            "html": f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f0f0f; padding: 40px; }}
                    .container {{ max-width: 500px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; padding: 32px; }}
                    h1 {{ color: #fff; font-size: 24px; margin-bottom: 16px; }}
                    p {{ color: #a0a0a0; line-height: 1.6; margin-bottom: 24px; }}
                    .button {{ display: inline-block; background: #fff; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; }}
                    .footer {{ margin-top: 24px; font-size: 12px; color: #666; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hola{nombre and f' {nombre}' or ''},</h1>
                    <p>Has solicitado restablecer tu contraseña en Nova Studio. Haz clic en el siguiente botón para elegir una nueva contraseña:</p>
                    <a href="{recovery_url}" class="button">Restablecer contraseña</a>
                    <p style="margin-top: 20px; font-size: 14px;">Este enlace expira en 1 hora.</p>
                    <div class="footer">
                        Si no solicitaste este cambio, puedes ignorar este email de forma segura. Tu contraseña no cambiará hasta que accedas al enlace y crees una nueva.
                    </div>
                </div>
            </body>
            </html>
            """,
        })
        return True
    except Exception as e:
        print(f"Error sending recovery email: {e}")
        return False