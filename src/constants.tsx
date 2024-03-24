export const colors = {
  light: {
    transparent: 'transparent',
    bg_color: '#ffffff',
    btn_hover: '#f9f9f9',
    btn_active_bg: '#eee',
    btn_active_text: '#000000',
    btn_text: '#252525',
    header_text: '#1f1f1f',
    text_color: '#2c2c2c',
    border_color: 'gray.300',
    date_color: '#666666',
    latest_post_title: '#666666',
    grid_color: "#2c2c2c",
    grid_text: "#1f1f1f",
    grid_date: "#666666",
    project_box_color: "#f9f9f9",
    project_year: "#9f9f9f",
    project_title: "#202020",
    project_description: "#888888",
  },
  dark: {
    transparent: 'transparent',
    bg_color: '#181818',
    btn_hover: '#252525',
    btn_active_bg: '#2c2c2c',
    btn_active_text: '#ffffff',
    btn_text: '#bbbbbb',
    header_text: '#ffffff',
    text_color: '#dddddd',
    border_color: '#2c2c2c',
    date_color: '#fe7d05',
    latest_post_title: 'gray.200',
    grid_color: "#e4e4e4",
    grid_text: "#ffffff",
    grid_date: "#999999",
    project_box_color: "#202020",
    project_year: "white",
    project_title: "white",
    project_description: "gray.300",
  },
}

export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://my-blog-wlw2esyewq-uc.a.run.app/graphql'
    : 'http://localhost:4000/graphql'
