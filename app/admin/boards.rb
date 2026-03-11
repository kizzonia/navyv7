ActiveAdmin.register Board do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :name, :title, :boardimg, :slug, :body, :board_id, :icon
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :title, :boardimg, :slug, :body]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
    f.inputs do
      f.input :title, placeholder: "work title"
      f.input :boardimg, :as => :file
      f.input :name, placeholder: "Board Member name"
      f.input :body,  as: :quill_editor
    end
    f.actions
  end

  controller do
         def find_resource
           scoped_collection.friendly.find(params[:id])
         end
       end
end
