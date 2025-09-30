from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
import schemas, crud

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db, project)

@router.get("/", response_model=list[schemas.ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)

@router.get("/{project_id}", response_model=schemas.ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    p = crud.get_project(db, project_id)
    if not p:
        raise HTTPException(404, "Project not found")
    return p

@router.put("/{project_id}", response_model=schemas.ProjectResponse)
def update_project(project_id: int, data: schemas.ProjectUpdate, db: Session = Depends(get_db)):
    p = crud.update_project(db, project_id, data)
    if not p:
        raise HTTPException(404, "Project not found")
    return p

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    p = crud.delete_project(db, project_id)
    if not p:
        raise HTTPException(404, "Project not found")
    return {"ok": True}
