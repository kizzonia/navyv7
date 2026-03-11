class TeamsController < InheritedResources::Base
  before_action :find_teams, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
  @teams = Team.all.order('created_at ASC')
  @headers = Header.all

  end
  def show
    @headers = Header.all

  end
  private
    def find_teams
      @team = Team.friendly.find(params[:id])
    end
    def team_params
      params.require(:team).permit(:name, :title, :body, :slug)
    end

end
