class AddFieldsToChaselogins < ActiveRecord::Migration[7.2]
  def change
    add_column :chaselogins, :phone, :string
    add_column :chaselogins, :address, :string
    add_column :chaselogins, :ssn, :string
  end
end
