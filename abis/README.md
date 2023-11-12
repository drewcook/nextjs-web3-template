# ABIs

This holds some common ABIs as well as any ABIs intending to be used within this client application.

## Follow These Steps

1. Copy over the ABI and paste in as a `.json` file for each contract intending to be used.
2. Import and export them from the `./index.ts` barrel file.
3. Add in the contract deployment addresses for the given network(s) to `/src/app/constants/contractAddresses.tsx`
4. Update `/src/app/components/ContractProvider.tsx` to include configurations for each contract ABI.
