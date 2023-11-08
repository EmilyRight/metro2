const tooltip = document.querySelector('.tooltip');

function handleTooltip() {
  const tooltipIcons = document.querySelectorAll('.tooltip-icon');
  tooltipIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      tooltip.classList.toggle('opened');
    });
  });
}

export default handleTooltip;
