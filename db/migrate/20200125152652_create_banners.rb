class CreateBanners < ActiveRecord::Migration[5.2]
  def change
    create_table :banners do |t|
      t.string :title
      t.string :sub_title
      t.string :bannerimg

      t.timestamps
    end
  end
end
