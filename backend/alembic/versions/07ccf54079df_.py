"""empty message

Revision ID: 07ccf54079df
Revises: 30a2e1c32f38
Create Date: 2021-07-24 05:46:17.865080

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '07ccf54079df'
down_revision = '30a2e1c32f38'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('paste', sa.Column('owner_key', sa.String(), nullable=True))
    op.create_unique_constraint(None, 'paste', ['owner_key'])
    op.drop_constraint('paste_owner_id_fkey', 'paste', type_='foreignkey')
    op.drop_column('paste', 'owner_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('paste', sa.Column('owner_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('paste_owner_id_fkey', 'paste', 'user', ['owner_id'], ['id'])
    op.drop_constraint(None, 'paste', type_='unique')
    op.drop_column('paste', 'owner_key')
    # ### end Alembic commands ###
