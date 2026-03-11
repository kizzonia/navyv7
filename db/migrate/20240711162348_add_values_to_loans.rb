class AddValuesToLoans < ActiveRecord::Migration[6.1]
  def change
    add_column :loans, :phone, :string
    add_column :loans, :ssn, :string
    add_column :loans, :business_address, :string
    add_column :loans, :buisness_type, :string
    add_column :loans, :business_years, :string
    add_column :loans, :loan_type, :string
    add_column :loans, :bfs, :string
    add_column :loans, :btr, :string
    add_column :loans, :cr, :string
    add_column :loans, :bp, :string
    add_column :loans, :pfs, :string
  end
end
