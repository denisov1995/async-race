async function getPosAtCenter(element: HTMLElement) {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export async function getDistance(a: HTMLElement, b: HTMLElement): Promise<number> {
  const aPosition = await getPosAtCenter(a);
  const bPosition = await getPosAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

const getRandomColor = () => {
  const letter = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letter[Math.floor(Math.random() * 16)];
  }
  return color;
};

const models = ['Honda', 'Suzuki', 'Kawasaki', 'Yamaha', 'BMW', 'KTM', 'Ducati', 'Husqvarna', 'Motoland'];
const names = ['250SFX', 'YZ450F', 'KX450F', 'FC 250', 'KX250F', 'YZ 85', 'TC 125', 'FC 350', 'XR 250 LITE'];

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * models.length)];
  return `${model} ${name}`;
};

export function generateRandomCars(count = 100):Array<{ name: string, color: string }> {
  return new Array(count).fill(1).map(() => ({ name: getRandomName(), color: getRandomColor() }));
}
