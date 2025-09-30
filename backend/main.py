from fastapi import FastAPI
from db import Base, engine
import projects, tasks

app = FastAPI(title="TodoList API", version="1.0.0")

# Demo 用：啟動時建立表（正式環境建議 Alembic）
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.include_router(projects.router)
app.include_router(tasks.router)
