require "application_system_test_case"

class PackagesTest < ApplicationSystemTestCase
  setup do
    @package = packages(:one)
  end

  test "visiting the index" do
    visit packages_url
    assert_selector "h1", text: "Packages"
  end

  test "creating a Package" do
    visit packages_url
    click_on "New Package"

    fill_in "Body", with: @package.body
    fill_in "Droi", with: @package.droi
    fill_in "Duration", with: @package.duration
    fill_in "Icon", with: @package.icon
    fill_in "Pkimg", with: @package.pkimg
    fill_in "Rate", with: @package.rate
    fill_in "Slug", with: @package.slug
    fill_in "Sub title", with: @package.sub_title
    fill_in "Title", with: @package.title
    click_on "Create Package"

    assert_text "Package was successfully created"
    click_on "Back"
  end

  test "updating a Package" do
    visit packages_url
    click_on "Edit", match: :first

    fill_in "Body", with: @package.body
    fill_in "Droi", with: @package.droi
    fill_in "Duration", with: @package.duration
    fill_in "Icon", with: @package.icon
    fill_in "Pkimg", with: @package.pkimg
    fill_in "Rate", with: @package.rate
    fill_in "Slug", with: @package.slug
    fill_in "Sub title", with: @package.sub_title
    fill_in "Title", with: @package.title
    click_on "Update Package"

    assert_text "Package was successfully updated"
    click_on "Back"
  end

  test "destroying a Package" do
    visit packages_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Package was successfully destroyed"
  end
end
