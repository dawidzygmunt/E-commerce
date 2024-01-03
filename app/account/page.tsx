import { Navbar } from '@/components/navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { NextResponse } from 'next/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import GeneralInforForm from './components/general-info-form';
import SeccurityForm from './components/security-form';


const AccountSettings = async () => {

  const session = await getServerSession(authOptions)
  const userId = session?.user?.email

  if (!userId) {
    return new NextResponse("Unatuhicated", { status: 401 })
  }
  console.log(session?.user?.image);



  return (


    <div>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
        
        <div className='flex flex-col gap-6'>
          <Card className=''>
            <CardContent className='p-4'>
              <div className='flex'>
                {session?.user?.image ? (
                  <p>Brak</p>
                ) : (
                  <Image
                    src="/photo.png"
                    alt='avatar'
                    width={100}
                    height={100}
                    className='rounded-xl p-1 aspect-square object-cover w-auto'
                  />
                )}
                <div className='flex flex-col justify-center pl-3'>
                  <CardTitle>{session?.user?.name}</CardTitle>
                  <p className='text-xs py-2 text-gray-300'>Admin</p>
                  <Button>
                    Change picture
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <SeccurityForm />
              </CardContent>
            </Card>
          </div>

          <div className=''>
            <Card>
              <CardHeader>
                <CardTitle>Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <SeccurityForm />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>General information</CardTitle>
            </CardHeader>
            <CardContent>
              <GeneralInforForm />
            </CardContent>
          </Card>
        </div>


      </div>

    </div>
  )
}

export default AccountSettings


