class AddPalnsToHeaders < ActiveRecord::Migration[5.2]
  def change
    add_column :headers, :plans_title, :string
    add_column :headers, :plans_sub_title, :string
  end
end
