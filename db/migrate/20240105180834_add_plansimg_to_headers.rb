class AddPlansimgToHeaders < ActiveRecord::Migration[6.1]
  def change
    add_column :headers, :plansimg, :string
    add_column :headers, :featheaderimg, :string
    add_column :headers, :planscta1, :string
    add_column :headers, :planscta2, :string

  end
end
