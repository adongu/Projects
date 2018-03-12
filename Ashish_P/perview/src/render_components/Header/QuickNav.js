import react from 'react';

renderNavOptions () {
  const navOptions = [
    {
      path: '/myperviews',
      text: 'My Perviews',
      icon: 'star'
    },
    {
      path: '/favorites',
      text: 'Favorites',
      icon: 'bookmark'
    }
  ];

  return (
    <div className="flexrow header__nav">
      {
        navOptions.map((option) => {
        let currentPath = this.props.match.path;
        let isActive = option.path === currentPath ? true : false;

        return (
            <Link to={option.path}
              className={`flexrow header__navbox ${isActive ? "active" : ""}`}
              key={`navoptions-${option.text}`}>
              <i className={`fa fa-${option.icon} fa-lg header__navicon`} aria-hidden="true"></i>
              <span className="header__navtext">{option.text}</span>
            </Link>
          )
        })
      }
    </div>
  )
}
