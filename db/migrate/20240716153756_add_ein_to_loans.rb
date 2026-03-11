class AddEinToLoans < ActiveRecord::Migration[6.1]
  def change
    add_column :loans, :ein_vat, :string
    add_column :loans, :drivers_lfront, :string
    add_column :loans, :drivers_lback, :string
  end
end
