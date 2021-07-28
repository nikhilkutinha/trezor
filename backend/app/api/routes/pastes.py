from typing import Any, Union
from datetime import datetime, timedelta

from app.api import deps
from app import crud, schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


def get_expiration_date(code: str) -> Union[datetime, None]:
    now = datetime.now()

    if code == '1':
        return now + timedelta(hours=1)
    elif code == '2':
        return now + timedelta(days=1)
    elif code == '3':
        return now + timedelta(weeks=1)
    elif code == '4':
        return now + timedelta(weeks=4)
    else:
        return None


@router.post("/", response_model=schemas.Paste)
def create_paste(
    *,
    db: Session = Depends(deps.get_db),
    paste_in: schemas.PasteCreate,
) -> Any:
    """
    Create a new paste.
    """
    paste_in.expiration_date = get_expiration_date(paste_in.expiration_date)
    paste = crud.paste.create(db=db, obj_in=paste_in)
    return paste


@router.get("/{uuid}", response_model=schemas.Paste)
def get_paste(*, db: Session = Depends(deps.get_db), uuid: str) -> Any:
    """
    Get a paste.
    """
    paste = crud.paste.get_by_uuid(db=db, uuid=uuid)
    if not paste:
        raise HTTPException(status_code=404, detail="Paste not found")
    return paste

@router.delete("/{uuid}", response_model=schemas.Paste)
def delete_paste(
    *,
    db: Session = Depends(deps.get_db),
    uuid: int,
) -> Any:
    """
    Delete a paste.
    """
    paste = crud.paste.get_by_uuid(db=db, uuid=uuid)
    if not paste:
        raise HTTPException(status_code=404, detail="Paste not found")
    if not crud.paste.is_owner(1):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    paste = crud.item.remove(db=db, id=id)
    return paste
