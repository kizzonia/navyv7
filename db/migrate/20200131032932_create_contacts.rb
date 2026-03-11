class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :country
      t.string :phone
      t.string :address
      t.string :footer_mgs
      t.string :email

      t.timestamps
    end
  end
end
