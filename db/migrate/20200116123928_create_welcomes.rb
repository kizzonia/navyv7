class CreateWelcomes < ActiveRecord::Migration[5.2]
  def change
    create_table :welcomes do |t|
      t.string :logoimg
      t.string :title
      t.string :desc
      t.string :whatsapp
      t.string :ig
      t.string :ln
      t.string :section
      t.string :link
      t.string :footer
      t.string :phone
      t.string :address
      t.string :twitter
      t.string :telegram

      t.timestamps
    end
  end
end
