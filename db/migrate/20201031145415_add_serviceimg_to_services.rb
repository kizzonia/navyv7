class AddServiceimgToServices < ActiveRecord::Migration[5.2]
  def change
    add_column :services, :serviceimg, :string
  end
end
