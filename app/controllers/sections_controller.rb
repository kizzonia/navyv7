class SectionsController < InheritedResources::Base
  before_action :authenticate_adminuser!, except: [:index, :show]

  private

    def section_params
      params.require(:section).permit(:title, :body, :sub_title, :icon, :sectionimg)
    end

end
