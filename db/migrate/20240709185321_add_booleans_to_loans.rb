class AddBooleansToLoans < ActiveRecord::Migration[6.1]
  def change
    add_column :loans, :step1_status, :boolean
    add_column :loans, :step2_status, :boolean
    add_column :loans, :step3_status, :boolean
  end
end
