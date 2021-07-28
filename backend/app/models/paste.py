from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime
from app.db.base_class import Base

import string
import random


def get_uuid(len=8):
    return "".join(random.choices(string.ascii_letters + string.digits, k=len))


class Paste(Base):
    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String, default=get_uuid, unique=True)
    title = Column(String, nullable=True)
    text = Column(String)
    language = Column(String, nullable=True)
    expiration_date = Column(DateTime, nullable=True)
    owner_key = Column(String, default=get_uuid, unique=True)
