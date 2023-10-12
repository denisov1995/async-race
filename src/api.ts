const base = 'http://localhost:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

interface IState {
  page: number,
  limit: number,
  sort: string,
  order: string,
}

interface IGetCar {
  id: number,
  name: string,
  color: string,
}

interface IStartEngine {
  velocity: number,
  distance: number,
}

interface IBool {
  success: boolean
}

export interface IWinners {
  items: { id: string; wins: string; time: string; car: { name: string; id: string; color: string; } }[],
  count: string | null,
}

interface IWins {
  wins: number,
  time: number,
}

export const getCars = async (page: number, limit = 7): Promise<{
  items: Array<{ name: string; id: string; color: string; }>, count: string
}> => {
  const responce = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await responce.json(),
    count: String(responce.headers.get('X-Total-Count')),
  };
};

export const getCar = async (id: number): Promise<IGetCar> => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: { name: string, color: string }): Promise<Response> => (await fetch(garage, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const deleteCar = async (id: string): Promise<Response> => (await fetch(`${garage}/${id}`, {
  method: 'DELETE',
})).json();

export async function updateCar(body: { name: string, color: string }, id: number): Promise<Response> {
  return (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();
}

export async function startEngine(id: number): Promise<IStartEngine> {
  return (await fetch(`${engine}?id=${id}&status=started`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();
}

export async function stopEngine(id: number): Promise<Response> {
  return (await fetch(`${engine}?id=${id}&status=stopped`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();
}

export const drive = async (id: number): Promise<IBool> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: string, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async ({
  page, limit = 10, sort = 'id', order = 'ASC',
}: IState): Promise<IWinners> => {
  const responce = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await responce.json();

  return {
    items: await Promise.all(
      items.map(async (winner: { id: number }) => ({ ...winner, car: await getCar(winner.id) })),
    ),
    count: responce.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<IWins> => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${winners}/${id}`)).status;

export async function deleteWinner(id: string): Promise<Response> {
  return (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
}

export async function createWinner(body: { id: number, wins: number, time: number }): Promise<number> {
  return (await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();
}

export async function updateWinner(id: number, body: { id: number, wins: number, time: number }): Promise<void> {
  return (await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();
}

export const saveWinner = async (id: number, time: number): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time > winner.time ? winner.time : time,
    });
  }
};
