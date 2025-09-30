from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://todo:password@localhost:5432/todo")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,      # 避免連線池失效
    pool_size=5,
    max_overflow=10,
)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

class Base(DeclarativeBase):
    pass

# 依賴注入：每個請求取得 DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
