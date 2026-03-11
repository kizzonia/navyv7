class AddLdToLoans < ActiveRecord::Migration[6.1]
  def change
    add_column :loans, :ld, :string
    add_column :loans, :status, :boolean
    add_column :loans, :agreement, :boolean
  end
end
