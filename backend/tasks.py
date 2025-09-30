from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from db import get_db
import schemas, crud

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

@router.get("/by_project/{project_id}", response_model=list[schemas.TaskResponse])
def get_tasks_by_project(
    project_id: int,
    db: Session = Depends(get_db),
    offset: int = 0,
    limit: int = Query(100, le=100),
):
    tasks = crud.get_tasks_by_project(db, project_id)
    return tasks[offset: offset + limit]

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    t = crud.get_task(db, task_id)
    if not t:
        raise HTTPException(404, "Task not found")
    return t

@router.patch("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, data: schemas.TaskUpdate, db: Session = Depends(get_db)):
    t = crud.update_task(db, task_id, data)
    if not t:
        raise HTTPException(404, "Task not found")
    return t

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    t = crud.delete_task(db, task_id)
    if not t:
        raise HTTPException(404, "Task not found")
    return {"ok": True}
