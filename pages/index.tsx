import userCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);

  if (!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {
  const { data: user} = userCurrentUser ();
  return (
    <>
      <h1 className="text-4xl font-bold underline text-red-500">Netflix Clone</h1>
      <p className='text-white h-10'>Logged in as : {user?.name}</p>
      <button className='h-10 w-full bg-white' onClick={() => signOut()}>Logout</button>
    </>
  )
}
