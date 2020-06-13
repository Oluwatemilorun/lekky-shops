export const SetBreadcrumbs = (path) => {
  const step = path.split('/');
  const breadcrumbs = [];

  step.forEach((view, index) => {
    if (index === 0) {
      breadcrumbs.push({
        text: 'home',
        url: '/'
      });
    } else {
      let url = '';
      const viewComponent = view; // router.getMatchedComponents(view);
      for (let i = 1; i <= index; i++) {
        url += `/${step[i]}`;
      }
      breadcrumbs.push({
        text: viewComponent.name || view,
        url
      });
    }
  });

  return breadcrumbs;
};
