import React from 'react';
import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './components/ui/dropdown-menu';
import {
  User,
  Settings,
  Plus,
  MenuIcon,
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  TwitterIcon,
  RouterIcon,
  HeartPulse,
  HouseIcon,
  User2Icon,
} from 'lucide-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card } from './components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navigation = () => {
  const { setVisible, visible } = useWalletModal();
  const { connect, connected, disconnect, publicKey } = useWallet();

  return (
    <>
      <div className="absolute top-0 left-0 z-10">
        <div className="flex items-start p-4 m-2 gap-2">
          <Avatar className="w-16 h-16 bg-gray-300">
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2'>
          <div className="flex space-x-2 bg-yellow-300">
            <div className="rounded-full px-2 py-1 flex items-center space-x-1">
              <span className="flex gap-2 place-items-center">
                0 <RouterIcon className="w-4 h-4" />
              </span>
            </div>
            <div className="rounded-full px-2 py-1 flex items-center space-x-1">
              <span className="flex gap-2 place-items-center">
                0 <HouseIcon className="w-4 h-4" />
              </span>
            </div>
            <div className="rounded-full px-2 py-1 flex items-center space-x-1">
              <span className="flex gap-2 place-items-center">
                0 <User2Icon className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Settings <MenuIcon className="w-4 h-4 ml-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-4">
                {connected && (
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>
                        {publicKey?.toBase58().slice(0, 4) +
                          '....' +
                          publicKey?.toBase58().slice(-4)}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>invite Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                )}
                <DropdownMenuGroup>
                  {!connected ? (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setVisible(true)}>
                      Connect Wallet
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className="cursor-pointer" onClick={disconnect}>
                      Disconnect Wallet
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
