from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    database_url: str = "sqlite+aiosqlite:///./data.sqlite"
    secret_key: str = "your-super-secret-key-here-change-in-production"
    access_token_expire_minutes: int = 60
    refresh_token_expire_days: int = 30
    allowed_origins: str = "https://webagencia.vercel.app,https://webagencia-frontend.vercel.app"
    app_env: str = "development"
    port: int = 8000

    @property
    def origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    class Config:
        env_file = ".env"


settings = Settings()
