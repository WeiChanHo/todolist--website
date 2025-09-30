from sqlalchemy.orm import Session
from sqlalchemy import select
import models, schemas

# Project
def create_project(db: Session, project: schemas.ProjectCreate):
    new_p = models.Project(name=project.name)
    db.add(new_p)
    db.commit()
    db.refresh(new_p)
    return new_p

def get_projects(db: Session):
    return db.execute(select(models.Project)).scalars().all()

def get_project(db: Session, project_id: int):
    return db.get(models.Project, project_id)

def update_project(db: Session, project_id: int, data: schemas.ProjectUpdate):
    p = db.get(models.Project, project_id)
    if not p:
        return None
    p.name = data.name
    db.commit()
    db.refresh(p)
    return p

def delete_project(db: Session, project_id: int):
    p = db.get(models.Project, project_id)
    if not p:
        return None
    db.delete(p)
    db.commit()
    return p

# Task
def create_task(db: Session, task: schemas.TaskCreate):
    t = models.Task(**task.model_dump())
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

def get_tasks_by_project(db: Session, project_id: int):
    stmt = select(models.Task).where(models.Task.project_id == project_id)
    return db.execute(stmt).scalars().all()

def get_task(db: Session, task_id: int):
    return db.get(models.Task, task_id)

def update_task(db: Session, task_id: int, data: schemas.TaskUpdate):
    t = db.get(models.Task, task_id)
    if not t:
        return None
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(t, k, v)
    db.commit()
    db.refresh(t)
    return t

def delete_task(db: Session, task_id: int):
    t = db.get(models.Task, task_id)
    if not t:
        return None
    db.delete(t)
    db.commit()
    return t
