"""empty message

Revision ID: 30a2e1c32f38
Revises: 7870dd8b8d57
Create Date: 2021-07-24 05:14:41.701015

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '30a2e1c32f38'
down_revision = '7870dd8b8d57'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('paste', 'uuid',
               existing_type=postgresql.UUID(),
               type_=sa.String(),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('paste', 'uuid',
               existing_type=sa.String(),
               type_=postgresql.UUID(),
               existing_nullable=True)
    # ### end Alembic commands ###
