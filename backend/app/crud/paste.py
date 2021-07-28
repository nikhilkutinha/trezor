from typing import List, Any

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.paste import Paste
from app.schemas.paste import PasteCreate, PasteUpdate


class CRUDPaste(CRUDBase[Paste, PasteCreate, PasteUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: PasteCreate, owner_id: int
    ) -> Paste:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[Paste]:
        return (
            db.query(self.model)
            .filter(Paste.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_uuid(self, db: Session, uuid: Any) -> Paste:
        return db.query(self.model).filter(self.model.uuid == uuid).first()


paste = CRUDPaste(Paste)