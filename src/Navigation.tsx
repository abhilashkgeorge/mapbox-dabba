import React from 'react';
import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from './components/ui/dropdown-menu';
import { User, Settings, Plus, MenuIcon } from 'lucide-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Navigation = () => {
  const { setVisible, visible } = useWalletModal();
  const { connect, connected, disconnect, publicKey } = useWallet();
  console.log(connected);

  return (
    <div className="bg-transparent absolute top-0 right-0 h-10 p-4 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MenuIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-4">
          {connected && (
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>
                  {publicKey?.toBase58().substring(0, 4) +
                    '...' +
                    publicKey?.toBase58().substring(publicKey?.toBase58().length - 4)}
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
  );
};

export default Navigation;
