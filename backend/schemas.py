from pydantic import BaseModel
from datetime import date
from typing import List

class TaskCreate(BaseModel):
    title: str
    description: str
    due_date: date
    priority: int
    project_id: int

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    due_date: date | None = None
    priority: int | None = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    due_date: date
    priority: int
    project_id: int
    class Config:
        from_attributes = True  # pydantic v2: 取代 orm_mode

class ProjectCreate(BaseModel):
    name: str

class ProjectUpdate(BaseModel):
    name: str

class ProjectResponse(BaseModel):
    id: int
    name: str
    tasks: List[TaskResponse] = []
    class Config:
        from_attributes = True
