const body = document.querySelector("body");

const IMG_AMOUNT = 9;

const handleImgLoad = () => {};

const displayBackground = (number) => {
  const img = new Image();
  img.src = `imgs/${number}.jpg`;
  img.classList.add("bgImg");
  body.prepend(img);
};

const randomNum = () => {
  let number = Math.floor(Math.random() * IMG_AMOUNT);
  if (number === 0) number = 9;
  return number;
};

const bgInit = () => {
  displayBackground(randomNum());
};

bgInit();
