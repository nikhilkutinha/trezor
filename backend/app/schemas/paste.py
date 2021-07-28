from typing import Optional

from pydantic import BaseModel
from uuid import UUID

# Shared properties
class PasteBase(BaseModel):
    text: str

# Properties to receive on item creation
class PasteCreate(PasteBase):
    language: str
    expiration_date: str
    pass


# Properties to receive on item update
class PasteUpdate(PasteBase):
    pass


# Properties shared by models stored in DB
class PasteInDBBase(PasteBase):
    id: str
    uuid: str
    language: str
    owner_key: str

    class Config:
        orm_mode = True


# Properties to return to client
class Paste(PasteInDBBase):
    pass


# Properties properties stored in DB
class PasteInDB(PasteInDBBase):
    pass