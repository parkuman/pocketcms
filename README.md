# pocketcms

## Instructions

### Install Packages

```
go mod tidy
```

### To run pocketbase and pocketcms:

```
go run pocketcms.go serve
```

### UI Development
1. Run pocketcms like above
2. in another terminal, open the `ui/` dir and run:
```
npm run dev
```
which should spin up vite at `localhost:3000`. This will give you all the HMR goodness. 
