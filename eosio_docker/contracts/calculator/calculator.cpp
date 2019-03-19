#include "calculator.hpp"

using namespace eosio;

CONTRACT calculator : public eosio::contract {

    using contract::contract;

    public: 
        // Constructor
        calculator( eosio::name receiver, eosio::name code, datastream<const char*> ds ):
            contract( receiver, code, ds ) {}

        const symbol native_sym = symbol("USD", 4);
        const uint64_t age_threshold = 788400000; // 25 Years in Seconds

        ACTION upsertbal(name account, uint64_t dob ) 
        {
            require_auth(get_self());
            
            uint64_t current_time = now(); // Current Time in Seconds in UTC from Jan 1 1970

            print(current_time, '\n');

            eosio_assert( current_time - dob >= age_threshold, "You must be older than 25 years to add a balance to your account" );

            calcTable ctable( get_self(), get_self().value );
            auto citer = ctable.find( account.value );

            if ( citer == ctable.end() ) {
                eosio::asset new_balance = eosio::asset(100000, native_sym); // 10.0000 USD

                ctable.emplace( get_self(), [&]( auto& c ) 
                {
                    c.account = account;
                    c.dob     = dob;
                    c.balance = new_balance;
                });
            } else {
                eosio::asset old_balance = citer->balance;
                eosio::asset new_balance = eosio::asset(100000 + old_balance.amount, native_sym);

                ctable.modify( citer, get_self(), [&]( auto& c ) 
                {   
                    c.balance = new_balance;
                });
            }

            action(
                eosio::permission_level( get_self(), name("active") ),
                name("eosio.token"),
                name("transfer"),
                transfer_args{ get_self(), account, eosio::asset(100000, native_sym), "You have received 10.0000 USD" } // What to do without Struct
            ).send();
        }

    private:
        struct transfer_args
        {
            eosio::name  from;
            eosio::name  to;
            eosio::asset quantity;
            std::string  memo;
        };

        TABLE calctable {
            name account;
            uint64_t dob;
            asset balance;

            uint64_t primary_key() const { return account.value; }
        };
        typedef eosio::multi_index<name("calctable"), calctable> calcTable;
};

EOSIO_DISPATCH( calculator, (upsertbal) )