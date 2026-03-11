class AddAbtsecToHeaders < ActiveRecord::Migration[5.2]
  def change
    add_column :headers, :abtsectionimg, :string
    add_column :headers, :featimg, :string
  end
end
