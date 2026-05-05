from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    database_url: str = "sqlite+aiosqlite:///./data.sqlite"
    secret_key: str = ""
    allowed_origins: str = "https://webagencia.vercel.app"
    app_env: str = "development"
    port: int = 8000

    # Supabase
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""

    @property
    def origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    class Config:
        env_file = ".env"


settings = Settings()
